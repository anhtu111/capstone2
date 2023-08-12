package com.example.Captone2.controller;


import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Employee;
import com.example.Captone2.respositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("")
    public ResponseEntity<List<Employee>> getEmployee() {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                employeeRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                employeeRepository.findById(id).get()
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
        Employee updateEployee = employeeRepository.findById(id)
                .map(Employee -> {
                   // Employee.setEmployeeId(newEmployee.getEmployeeId());
                    Employee.setAge(newEmployee.getAge());
                    Employee.setName(newEmployee.getName());
                    Employee.setGender(newEmployee.getGender());
                    Employee.setPhone(newEmployee.getPhone());
                    Employee.setDayOfBirth(newEmployee.getDayOfBirth());
                    Employee.setDegree(newEmployee.getDegree());
                    Employee.setEmail(newEmployee.getEmail());
                    Employee.setExperience(newEmployee.getExperience());
                    Employee.setAccountId(newEmployee.getAccountId());
                    Employee.setImage(newEmployee.getImage());

                    return employeeRepository.save(Employee);
                }).orElseGet(() -> {
                    newEmployee.setEmployeeId(id);
                    return employeeRepository.save(newEmployee);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Employee successfully", updateEployee)
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertEmployee (@RequestBody Employee newE){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Employee successfully", employeeRepository.save(newE))
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteEmployee(@PathVariable Long id) {
        boolean exists = employeeRepository.existsById(id);
        if(exists) {
            employeeRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Employee successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Employee to delete", "")
        );
    }


}
