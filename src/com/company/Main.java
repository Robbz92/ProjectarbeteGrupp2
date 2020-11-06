package com.company;

import express.Express;
import express.middleware.Middleware;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        Database db = new Database();
        Express app = new Express();

        // add todoo items in sql
        app.post("/rest/notes", (req,res) ->{
            String content = (String)req.getBody().get("text");
            db.addContentToDB(content);

            res.send("Ok");
        });

        // fetch all todo-items from sql
        app.get("/rest/test", (req, res) ->{
            List<Note> noteList = db.getNotesFromDB();

            // send list to site
            res.json(noteList);
        });

        // get dataID
        app.post("/rest/dataID", (req, res) ->{
            int dataID = (int)req.getBody().get("id");
            db.deleteItemFromDB(dataID);

            System.out.println("Removed dataID: " + dataID);
            res.send("Ok");
        });

        // Path to HTML/CSS/JS
        try {
            app.use(Middleware.statics(Paths.get("www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Port server is listening on
        app.listen(3000);
        System.out.println("Server listen on port 3000");
    }
}
