package com.company;

/**
 * @author Robin Persson,
 */
public class Note {
    private String text;
    private int id;

    public Note() {}

    public Note(String text, int id){
        this.text = text;
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public int getId() {
        return id;
    }
}
