const express = require("express");
const cors = require("cors");
const db = require("./db/connection");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ================= RIDERS =================

app.get("/api/riders", (req, res) => {
  db.query("SELECT * FROM riders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/riders", (req, res) => {
  const { rider_name, age, phone, experience_level } = req.body;

  db.query(
    "INSERT INTO riders (rider_name, age, phone, experience_level) VALUES (?, ?, ?, ?)",
    [rider_name, age, phone, experience_level],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Rider Added Successfully",
      });
    }
  );
});

app.delete("/api/riders/:id", (req, res) => {
  db.query(
    "DELETE FROM riders WHERE rider_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Rider Deleted Successfully",
      });
    }
  );
});

// ================= HORSES =================

app.get("/api/horses", (req, res) => {
  db.query("SELECT * FROM horses", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/horses", (req, res) => {
  const { horse_name, breed, age, status } = req.body;

  db.query(
    "INSERT INTO horses (horse_name, breed, age, status) VALUES (?, ?, ?, ?)",
    [horse_name, breed, age, status],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Horse Added Successfully",
      });
    }
  );
});

app.delete("/api/horses/:id", (req, res) => {
  db.query(
    "DELETE FROM horses WHERE horse_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Horse Deleted Successfully",
      });
    }
  );
});

// ================= TRAINERS =================

app.get("/api/trainers", (req, res) => {
  db.query("SELECT * FROM instructors", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ================= BOOKINGS =================

app.get("/api/bookings", (req, res) => {
  db.query(
    `SELECT 
      b.booking_id,
      r.rider_name,
      h.horse_name,
      i.instructor_name,
      b.booking_date,
      b.status
     FROM bookings b
     JOIN riders r ON b.rider_id = r.rider_id
     JOIN horses h ON b.horse_id = h.horse_id
     JOIN instructors i ON b.instructor_id = i.instructor_id`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
});

app.post("/api/bookings", (req, res) => {
  const {
    rider_id,
    horse_id,
    instructor_id,
    booking_date,
  } = req.body;

  db.query(
    "INSERT INTO bookings (rider_id, horse_id, instructor_id, booking_date, status) VALUES (?, ?, ?, ?, 'Scheduled')",
    [rider_id, horse_id, instructor_id, booking_date],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Booking Created Successfully",
      });
    }
  );
});

app.delete("/api/bookings/:id", (req, res) => {
  db.query(
    "DELETE FROM bookings WHERE booking_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Booking Deleted Successfully",
      });
    }
  );
});

// ================= DASHBOARD =================

app.get("/api/dashboard", (req, res) => {
  const dashboardData = {};

  db.query(
    "SELECT COUNT(*) AS totalRiders FROM riders",
    (err, ridersResult) => {
      if (err) return res.status(500).json(err);

      dashboardData.totalRiders = ridersResult[0].totalRiders;

      db.query(
        "SELECT COUNT(*) AS totalHorses FROM horses",
        (err, horsesResult) => {
          if (err) return res.status(500).json(err);

          dashboardData.totalHorses = horsesResult[0].totalHorses;

          db.query(
            "SELECT COUNT(*) AS totalTrainers FROM instructors",
            (err, trainersResult) => {
              if (err) return res.status(500).json(err);

              dashboardData.totalTrainers =
                trainersResult[0].totalTrainers;

              db.query(
                "SELECT COUNT(*) AS totalBookings FROM bookings",
                (err, bookingsResult) => {
                  if (err) return res.status(500).json(err);

                  dashboardData.totalBookings =
                    bookingsResult[0].totalBookings;

                  res.json(dashboardData);
                }
              );
            }
          );
        }
      );
    }
  );
});

// Get Attendance
app.get("/api/attendance", (req, res) => {
  db.query(
    `SELECT
      a.attendance_id,
      a.attendance_status,
      a.trainer_notes,
      r.rider_name
     FROM attendance a
     JOIN bookings b ON a.booking_id = b.booking_id
     JOIN riders r ON b.rider_id = r.rider_id`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

// Add Attendance
app.post("/api/attendance", (req, res) => {
  const {
    booking_id,
    attendance_status,
    trainer_notes,
  } = req.body;

  db.query(
    "INSERT INTO attendance (booking_id, attendance_status, trainer_notes) VALUES (?, ?, ?)",
    [booking_id, attendance_status, trainer_notes],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Attendance Saved Successfully",
      });
    }
  );
});

app.get("/api/recent-bookings", (req, res) => {
  db.query(
    `SELECT 
      b.booking_id,
      r.rider_name,
      h.horse_name,
      i.instructor_name,
      b.booking_date
     FROM bookings b
     JOIN riders r ON b.rider_id = r.rider_id
     JOIN horses h ON b.horse_id = h.horse_id
     JOIN instructors i ON b.instructor_id = i.instructor_id
     ORDER BY b.booking_id DESC
     LIMIT 5`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

// Get Payments
app.get("/api/payments", (req, res) => {
  db.query(
    `SELECT
      p.payment_id,
      p.amount,
      p.payment_date,
      p.payment_status,
      r.rider_name
     FROM payments p
     JOIN riders r ON p.rider_id = r.rider_id`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

// Add Payment
app.post("/api/payments", (req, res) => {
  const {
    rider_id,
    amount,
    payment_date,
    payment_status,
  } = req.body;

  db.query(
    "INSERT INTO payments (rider_id, amount, payment_date, payment_status) VALUES (?, ?, ?, ?)",
    [rider_id, amount, payment_date, payment_status],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Payment Added Successfully",
      });
    }
  );
});

app.get("/api/revenue", (req, res) => {
  db.query(
    "SELECT SUM(amount) AS totalRevenue FROM payments WHERE payment_status='Paid'",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
});

app.delete("/api/payments/:id", (req, res) => {
  db.query(
    "DELETE FROM payments WHERE payment_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Payment Deleted Successfully",
      });
    }
  );
});

// Get Invoices
app.get("/api/invoices", (req, res) => {
  db.query(
    `SELECT
      i.invoice_id,
      i.invoice_number,
      i.invoice_date,
      r.rider_name,
      p.amount,
      p.payment_status
     FROM invoices i
     JOIN payments p ON i.payment_id = p.payment_id
     JOIN riders r ON p.rider_id = r.rider_id`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

// Generate Invoice
app.post("/api/invoices", (req, res) => {
  const { payment_id } = req.body;

  const invoiceNumber =
    "INV-" + Date.now();

  db.query(
    "INSERT INTO invoices (payment_id, invoice_number, invoice_date) VALUES (?, ?, CURDATE())",
    [payment_id, invoiceNumber],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Invoice Generated Successfully",
      });
    }
  );
});

app.get("/api/reports", (req, res) => {
  db.query(
    `SELECT
      COUNT(*) AS totalPayments,
      SUM(CASE WHEN payment_status='Paid' THEN 1 ELSE 0 END) AS paidPayments,
      SUM(CASE WHEN payment_status='Pending' THEN 1 ELSE 0 END) AS pendingPayments,
      SUM(CASE WHEN payment_status='Paid' THEN amount ELSE 0 END) AS totalRevenue
     FROM payments`,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
});



app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE user_name = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        res.json({
          success: true,
          message: "Login Successful",
        });
      } else {
        res.json({
          success: false,
          message: "Invalid Username or Password",
        });
      }
    }
  );
});
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});