package com.example.Captone2.controller;


import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Schedule;
import com.example.Captone2.respositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("schedule")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping("")
    public ResponseEntity<List<Schedule>> getSchedule() {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                scheduleRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                scheduleRepository.findById(id).get()
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertSchedule (@RequestBody Schedule newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Schedule successfully", scheduleRepository.save(newC))
        );
    }


    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateSchedule(@RequestBody Schedule newSchedule, @PathVariable Long id) {
        Schedule updateSchedule = scheduleRepository.findById(id)
                .map(Schedule -> {

            Schedule.setSchedule_ID(newSchedule.getSchedule_ID());
            Schedule.setDateOfWeek(newSchedule.getDateOfWeek());
            Schedule.setTime(newSchedule.getTime());

            return scheduleRepository.save(Schedule);
        }).orElseGet(() -> {
            newSchedule.setSchedule_ID(id);
            return scheduleRepository.save(newSchedule);
        });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Schedule successfully", updateSchedule));
    }


    @DeleteMapping("delete/{id}")
    ResponseEntity deleteSchedule(@PathVariable Long id) {
        boolean exists = scheduleRepository.existsById(id);
        if(exists) {
            scheduleRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Schedule successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Schedule to delete", "")
        );
    }
}
