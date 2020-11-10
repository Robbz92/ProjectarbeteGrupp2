package com.company;


public class Categories {
    private int categoryID;
    private String category;

    public Categories(int categoryID, String category){

    this.categoryID=categoryID;
    this.category=category;

    }
    public int getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }



}
