package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Room;
import com.example.Captone2.respositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("")
    public ResponseEntity<List<Room>> getRoom() {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                roomRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                roomRepository.findById(id).get()
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateRoom(@RequestBody Room newRoom, @PathVariable Long id) {
        Room updateRoom = roomRepository.findById(id)
                .map(Room -> {
                    Room.setRoomId(newRoom.getRoomId());
                    Room.setRoomName(newRoom.getRoomName());
                    Room.setRoomType(newRoom.getRoomType());
                    Room.setBooking(newRoom.getBooking());
                    Room.setPrice(newRoom.getPrice());
                    return roomRepository.save(Room);
                }).orElseGet(() -> {
                    newRoom.setRoomId(id);
                    return roomRepository.save(newRoom);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Booking successfully", updateRoom)
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertRoom (@RequestBody Room newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Booking successfully", roomRepository.save(newC))
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteMember(@PathVariable Long id) {
        boolean exists = roomRepository.existsById(id);
        if(exists) {
            roomRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Room successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Room to delete", "")
        );
    }
}
