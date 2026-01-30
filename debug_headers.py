import zipfile
import re
import xml.etree.ElementTree as ET
import os

FILE = 'Reference/OT_Risk_MonteCarlo_Risk_Assessment_Profile.xlsx'

def get_shared_strings(z):
    strings = []
    try:
        with z.open('xl/sharedStrings.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            # Namespace map usually needed, but findall with wildcards or loop works
            # xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in root.findall('ns:si', ns):
                t = si.find('ns:t', ns)
                strings.append(t.text if t is not None else "")
    except KeyError:
        print("No shared strings found.")
    return strings

def get_sheet_names(z):
    sheets = []
    try:
        with z.open('xl/workbook.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            sheets_node = root.find('ns:sheets', ns)
            if sheets_node is not None:
                for sheet in sheets_node.findall('ns:sheet', ns):
                    name = sheet.attrib.get('name')
                    rId = sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                    sheets.append((name, rId))
    except Exception as e:
        print(f"Error reading workbook.xml: {e}")
    return sheets

def debug_sheet(z, sheet_filename, shared_strings):
    print(f"\n--- Debugging {sheet_filename} ---")
    try:
        with z.open(f'xl/worksheets/{sheet_filename}') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            sheetData = root.find('ns:sheetData', ns)
            
            # Print first 5 rows
            if sheetData is not None:
                rows = sheetData.findall('ns:row', ns)
                for i, row in enumerate(rows[:20]): # Look at first 20 rows
                    row_vals = []
                    for c in row.findall('ns:c', ns):
                        t_type = c.attrib.get('t')
                        v_node = c.find('ns:v', ns)
                        val = v_node.text if v_node is not None else ""
                        
                        if t_type == 's' and val.isdigit():
                            val = shared_strings[int(val)]
                        
                        if val:
                            row_vals.append(val)
                    
                    if row_vals:
                        print(f"Row {i+1}: {row_vals}")
    except KeyError:
        print(f"Sheet file {sheet_filename} not found in zip.")

try:
    with zipfile.ZipFile(FILE, 'r') as z:
        print("Opened xlsx as zip.")
        shared_strings = get_shared_strings(z)
        sheets = get_sheet_names(z)
        
        # Get sheet relationships to map rId to filename
        # This is a bit complex without full parsing relation files.
        # usually sheet1 -> workbook.xml rId1.
        # We'll just look for standard sheet names.
        
        # Let's just list files in zip/xl/worksheets
        worksheet_files = [f for f in z.namelist() if f.startswith('xl/worksheets/sheet')]
        print(f"Found worksheet files: {worksheet_files}")
        
        # We need to map Scenarios sheet name to file.
        # Assuming typical order or just dumping all.
        for ws_file in worksheet_files:
            debug_sheet(z, os.path.basename(ws_file), shared_strings)

except Exception as e:
    print(f"Error: {e}")
