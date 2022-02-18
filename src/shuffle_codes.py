import json
import random


def main():
    # Read academic_codes.json
    with open('academic_codes.json', 'r') as f:
        academic_codes = json.load(f)
        # Shuffle the codes
        random.shuffle(academic_codes)
        # Delete all courses that don't have a ProgramAcademicYear of "2022"
        academic_codes = [academic_code for academic_code in academic_codes if academic_code['ProgramAcademicYear'] == '2022']
        # Delete all properties except AcademicPlanCode, ProgramName, CareerText and Duration
        academic_codes = [{'AcademicPlanCode': academic_code['AcademicPlanCode'], 'ProgramName': academic_code['ProgramName'], 'CareerText': academic_code['CareerText'], 'Duration': academic_code['Duration']} for academic_code in academic_codes]
        # Write the shuffled codes to academic_codes_shuffled.json
        with open('academic_codes_shuffled.json', 'w') as f:
            json.dump(academic_codes, f, indent=4)


if __name__ == '__main__':
    main()