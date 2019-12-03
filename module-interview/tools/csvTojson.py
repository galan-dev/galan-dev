import csv
import json
import sys
import os

data = {}

def convertTojson(csvFilePath, jsonSavePath):
    fileAbs = os.path.basename(csvFilePath)
    fileName = os.path.splitext(fileAbs)[0]
    error = False
    try:
        with open(csvFilePath) as csvFile:
            csvRead = csv.DictReader(csvFile)
            for count, rows in enumerate(csvRead):
                questionId = count
                data[questionId] = rows
    except:
        print("CSV data could not be read: ", fileName)
        error = True
    if error == False:
        try:
            fullPath = os.path.join(jsonSavePath, fileName + ".json")
            with open(fullPath, 'w') as jsonFile:
                jsonFile.write(json.dumps(data, indent=4))
        except:
            print("JSON data could not be created: ", fileName)
            error = True
    if error == True:print("An Error Occured")
    else: print("convert Success!")

def convertTocsv():
    pass

if __name__ == "__main__":
    csvFilePath = sys.argv[1]
    jsonFilePath = sys.argv[2]

    convertTojson(csvFilePath, jsonFilePath)
