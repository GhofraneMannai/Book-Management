const express = require("express")
const mongoose = require("mongoose")
const Book = require("./models/books")
const Auteur = require("./models/auteur")
const Edition = require("./models/edition")
//sur mongo local
mongoose.connect("mongodb://localhost:27017/Books",{
    useNewUrlParser: true , useUnifiedTopology:true }
  ).then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!",e))
  
const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Heders",
    "Origin,X-Requsted-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});


//auteur

//post
app.post("/api/author",(req,res)=>{
  const author = new Auteur(req.body)
  author.save().then(()=>{
    res.status(201).json({
      models:author,
      message:"auteur cree!"
    })
  })
  .catch((error) => {
    res.status(400).json({
      error:error.message,
      message: "Donnee invalides",
    })
  })

});


//patch
app.patch("/api/author/:id", (req, res) => {
  Auteur.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "auteur non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur modifié!",
        });
      }
    }
  )
});

//put
app.put("/api/put/:id", (req, res) => {
  Auteur.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "auteur non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur modifié!",
        });
      }
    }
  )
});

//find tout 
app.get("/api/author",(req,res)=>{
  Auteur.find().then((auteurs) => {res.status(200).json({
    model:auteurs,
    message:"success"
      })
      .catch((error) => ({
        error:error.message,
        message:"probleme d'extraction"
      }))
  })
   
});

//find by id 
app.get("/api/authorbyid/:id", (req, res) => {
  Auteur.findOne({ _id: req.params.id })
    .then((auteur) => {
      if (!auteur) {
          res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});

//delete
app.delete("/api/author/delete/:id", (req, res) => {
  Auteur.deleteOne({_id:req.params.id})
    .then((auteur) =>
      res.status(200).json({
        message: "success!",
      })
    )

    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction ",
      });
    });
});



//---------------------------------------------------------------edition------------------------------------------//

//post
app.post("/api/edition",(req,res)=>{
  const edition = new Edition(req.body)
  edition.save().then(()=>{
    res.status(201).json({
      models:edition,
      message:"edition cree!"
    })
  })
  .catch((error) => {
    res.status(400).json({
      error:error.message,
      message: "Donnee invalides",
    })
  })

});

//patch
app.patch("/api/edition/:id", (req, res) => {
  Edition.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (edition) => {
      if (!edition) {
        res.status(404).json({
          message: "edition non trouvé!",
        });
      } else {
        res.status(200).json({
          model: edition,
          message: "auteur modifié!",
        });
      }
    }
  )
});

//find tout 
app.get("/api/edition",(req,res)=>{
  Edition.find().then((editions) => {res.status(200).json({
    model:editions,
    message:"success"
      })
      .catch((error) => ({
        error:error.message,
        message:"probleme d'extraction"
      }))
  })
   
});

//find by id 
app.get("/api/editionbyid/:id", (req, res) => {
  Edition.findOne({ _id: req.params.id })
    .then((edition) => {
      if (!edition) {
          res.status(404).json({
          message: "edition non trouvé!",
        });
      } else {
        res.status(200).json({
          model: edition,
          message: "edition trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});

//delete
app.delete("/api/edition/delete/:id", (req, res) => {
  Edition.deleteOne({_id:req.params.id})
    .then((edition) =>
      res.status(200).json({
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction ",
      });
    });
});


//---------------------------------------------------------------livre----------------------------------------

//post
app.post('/api/livre/:id/:idedition', async (req, res) => {
  try {
      const authorId = req.params.id;

      // Recherche de l'auteur par son ID
      const author1 = await Auteur.findOne({ _id: authorId });

      if (!author1) {
          return res.status(404).json({
              message: "Auteur non trouvé!",
          });
      }
        const editionId = req.params.idedition;
  
        // Recherche de l'auteur par son ID
        const edition1 = await Edition.findOne({ _id: editionId });
  
        if (!edition1) {
            return res.status(404).json({
                message: "Edition non trouvé!",
            });
        }

      // Création d'un nouveau livre en utilisant les données du corps de la requête (req.body)
      const book = new Book(req.body);

      // Assigner l'auteur au livre
      book.author = author1;
      book.edition= edition1;

             // Enregistrez le nouveau livre
             await book.save();
     
             res.status(201).json({
                 model: book,
                 message: "Livre créé avec succès!"
             });
         } catch (error) {
             console.error(error);
             res.status(500).json({
                 error: error.message,
                 message: "Erreur serveur"
             });
         }
     });


//patch
app.patch("/api/book/:id", (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (book) => {
      if (!book) {
        res.status(404).json({
          message: "book non trouvé!",
        });
      } else {
        res.status(200).json({
          model: book,
          message: "book modifié!",
        });
      }
    }
  )
});

//find tout 
app.get("/api/books",(req,res)=>{
  Book.find().then((books) => {res.status(200).json({
    model:books,
    message:"success"
      })
      .catch((error) => ({
        error:error.message,
        message:"probleme d'extraction"
      }))
  })
   
});

//find by id 
app.get("/api/bookbyid/:id", (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((auteur) => {
      if (!auteur) {
          res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
});



module.exports = app


