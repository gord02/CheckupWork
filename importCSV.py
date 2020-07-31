import csv


def importCSV():
    # this line converts file which was already csv file into a csv called csv_file
    with open("../csv/testcsvfile.csv") as csv_file:
        # this line sets the file to be read in csv and passes in a delimiter to find commas and remove them
        csv_reader = csv.reader(csv_file, delimiter=",")
        for row in csv_reader:
            print(row)


# if this file is not imported and run from the main file, then run the function
if __name__ == "__main__":
    importCSV()
