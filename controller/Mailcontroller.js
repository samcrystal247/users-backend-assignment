const MailModel = require("../Models/MailModel");
const CreateMail = async (req, res) => {
  try {
    const { date, sender, receiver, subject, msgContent } = req.body;

    // 2. Check if mail already exists
    const msg = await MailModel.findOne({ msgContent });

    if (msg) {
      return res.status(409).json({
        message: "message already exists",
      });
    }

    // 4. Create new user
    const newmsg = new MailModel({
      date,
      sender,
      receiver,
      subject,
      msgContent,
    });

    await newmsg.save();

    // 5. Success response
    res.status(201).json({
      message: "message created successfully",
      user: {
        id: newmsg._id,
        date: newmsg.date,
        sender: newmsg.sender,
        receiver: newmsg.receiver,
        subject: newmsg.subject,
        msgContent: newmsg.msgContent,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const GetAllMsg = async (req, res) => {
  try {
    const result = await MailModel.find()
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetSingleMsg = async (req, res) => {
  const { id } = req.params;

  try {
    // TO CHECK IF MESSAGE EXISTS IN THE DB
    const singleMsg = await MailModel.findById(id)
      .populate("sender")
      .populate("receiver");

    if (!singleMsg) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // RETURNING THE MESSAGE DETAILS
    res.status(200).json(singleMsg);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve message",
    });
  }
};

const UpdateSingleMsg = async (req, res) => {
  const { date, sender, receiver, subject, msgContent } = req.body;
  const { id } = req.params;

  try {
    /// TO CHECK IF THE USER EXIST IN OUR DB UNDER USERS COLLECTION
    const update = await MailModelModel.findById(id)
      .populate("sende")
      .populate("receiver");
    if (!update) {
      return res.status(404).json({
        message: "mail not found",
      });
    } else {
      update.date = date || update.date;
      update.sender = sender || update.sender;
      update.receiver = receiver || update.receiver;
      update.subject = subject || update.subject;
      update.msgContent = msgContent || update.msgContent;
    }

    /// SAVING THE UPDATED USER DETAILS
    await update.save();

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      message: " msg update failed",
    });
  }
};
const DeleteSinglemsg = async (req, res) => {
  const { id } = req.params;

  try {
    /// TO CHECK IF USER EXIST IN OUR DB UNDER USER COLLECTION
    const DeleteSinlemsg = await MailModel.findByIdAndDelete(id)
      .populate("sender")
      .populate("receiver");
    if (!DeleteSinlemsg) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    /// RETURNING A SUCCESS MESSAGE
    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    // where i'm handling my server error message
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};

module.exports = {
  CreateMail,
  GetAllMsg,
  GetSingleMsg,
  UpdateSingleMsg,
  DeleteSinglemsg,
};
