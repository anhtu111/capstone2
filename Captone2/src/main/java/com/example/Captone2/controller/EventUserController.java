package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.EventUser;
import com.example.Captone2.respositories.EventUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("event")
public class EventUserController {
    @Autowired
    private EventUserRepository eventUserRepository;

    @GetMapping("")
    public ResponseEntity<List<EventUser>> getEvent() {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                eventUserRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventUser> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                eventUserRepository.findById(id).get()
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateEvent(@RequestBody EventUser newEventUser, @PathVariable Long id) {
        EventUser updateEventUser = eventUserRepository.findById(id)
                .map(EventUser -> {
                    EventUser.setEvenMembertld(newEventUser.getEvenMembertld());
                   // EventUser.setEmployeeld(newEventUser.getEmployeeld());
                    EventUser.setMemberld(newEventUser.getMemberld());
                    EventUser.setEvenName(newEventUser.getEvenName());
                    EventUser.setStartTime(newEventUser.getStartTime());
                    EventUser.setDoneTime(newEventUser.getDoneTime());
                    EventUser.setDecription(newEventUser.getDecription());
                    EventUser.setImage(newEventUser.getImage());

                    return eventUserRepository.save(EventUser);
                }).orElseGet(() -> {
                    newEventUser.setEvenMembertld(id);
                    return eventUserRepository.save(newEventUser);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Event successfully", newEventUser)
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertEvent (@RequestBody EventUser newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Member successfully", eventUserRepository.save(newC))
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteMember(@PathVariable Long id) {
        boolean exists = eventUserRepository.existsById(id);
        if(exists) {
            eventUserRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete event successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find event to delete", "")
        );
    }
}

