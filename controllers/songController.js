const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong, deleteSong,updateSong } = require("../queries/songs")
const {checkName, checkBoolean} = require("../validations/checkSongs")

// INDEX
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
        res.status(200).json(allSongs);
      } else {
        res.status(500).json({ error: "server error" });
      }
});

songs.get("/:id", async (req, res) =>{
    const {id} = req.params
    const song = await getSong(id)
    if(song){
        res.status(200).json(song)
    } else{
        res.status(404).json({error: "not found"})
    }
})

songs.post("/", checkName, checkBoolean, async (req,res) => {
    try{
        const song = await createSong(req.body)
        res.status(200).json(song)
    } catch (error){
        res.status(400).json({error: error})
    }
})

songs.delete("/:id", async ( req, res) => {
    const {id} = req.params
    const deletedSong = await deleteSong(id)
    if(deletedSong.id){
    res.status(200).json(deletedSong)
    }else res.status(404).json("Song not found")
})

songs.put("/:id", checkBoolean, checkName, async (req, res) => {
    const { id } = req.params;
    const updatedSong = await updateSong(id, req.body);
    if(updatedSong){
        res.status(200).json(updatedSong)
    } else{
        res.status(404).json({error: "not found"})
    }
    res.status(200).json(updatedSong);
  });

module.exports = songs;