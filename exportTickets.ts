const mongoose = require("mongoose");
const Ticket = require("../db/ticketModel");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// connects to database
mongoose.connect("mongodb://localhost/ticketholder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// equips csv writer, sets path for csv files and creates header for csv file
const csvWriter = createCsvWriter({
  path: "../csv/testcsvfile.csv",
  header: [
    { id: "id", title: "id" },
    { id: "title", title: "Title" },
    { id: "comment", title: "Comment" },
    { id: "firstname", title: "First Name" },
    { id: "email", title: "email" },
    { id: "label", title: "Label" },
    { id: "date", title: "Date" },
  ],
});

const data = [];
async function exportToCSV(): Promise<void> {
  const query = Ticket.find({});
  let tickets;
  try {
    // tickets is all the tickets from the query which was find
    tickets = await query.exec();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
    return;
  }
  tickets.forEach((ticket) => {
    const newData = {
      id: ticket._id,
      title: ticket.title,
      comment: ticket.comment,
      firstname: ticket.firstname,
      email: ticket.email,
      label: ticket.label,
      date: ticket.date,
    };
    data.push(newData);
  });
  mongoose.disconnect();

  await csvWriter.writeRecords(data);
  console.log("The CSV file was written successfully");
}

exportToCSV();
