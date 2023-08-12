package com.example.Captone2.controller;


import com.example.Captone2.common.enums.RoleName;
import com.example.Captone2.config.JwtTokenUtil;
import com.example.Captone2.entity.Role;
import com.example.Captone2.model.security.*;
import com.example.Captone2.model.security.model.Class;
import com.example.Captone2.respositories.RoleRepository;
import com.example.Captone2.respositories.UserRepository;
import com.example.Captone2.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("")
public class JwtAuthenticationController {
    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;


    @GetMapping("/view/account")
    public ResponseEntity<List<DAOUser>> getList() {
       List user = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                user
        );
    }

    @GetMapping("/api/{username}")
    public ResponseEntity<DAOUser> getLists(@PathVariable String username) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                userRepository.getByUsername(username)
        );
    }

    @GetMapping("/view/account/{id}")
    public ResponseEntity<DAOUser> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                userRepository.findById(id).get()
        );
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            //throw new Exception("Incorrect username or password", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("failed", "Incorrect username or password", "")
            );
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        // Return token
        return ResponseEntity.ok().header("Access-Control-Allow-Origin", "*")
                .body(new JwtResponse(token));

    }
    @RequestMapping(value = "/view/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user));
    }


    @RequestMapping(value = "/basic/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUserBasic(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save_basic(user));
    }




    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> update(@RequestBody UserDTO newUser, @PathVariable Long id) {
        DAOUser user = new DAOUser();
        DAOUser updateUser = userRepository.findById(id)
                .map(DAOUser -> {

                    //UserDTO.setUsername(newClass.getClassName());
                    Set<Role> roles = new HashSet<>();

                    //List<Role> rl = roleRepository.findAll();

                    String roleName = newUser.getRoleName();
                    if (roleName != null && roleName.equals("ROLE_EMPLOYEE")) {
                        Role userRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE);
                        roles.add(userRole);
                        DAOUser.setRoles(roles);
                    }
                    if (roleName != null && roleName.equals("ROLE_USER")) {
                        Role userRole = roleRepository.findByName(RoleName.ROLE_USER);
                        roles.add(userRole);
                        DAOUser.setRoles(roles);
                    }

                    DAOUser.setPhone(newUser.getPhone());
                    DAOUser.setEmail(newUser.getEmail());
                  //  DAOUser.setPassword(newUser.getPassword());
                  //  DAOUser.setConfirmPassword(newUser.getConfirmPassword());




                    return userRepository.save(DAOUser);
                }).orElseGet(() -> {
                    user.setId(id);
                    return userRepository.save(user);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Class successfully", updateUser)
        );
    }

    @PutMapping("/put/pass/{id}")
    ResponseEntity<ResponseObject> updatePassword(@RequestBody UserDTO newUser, @PathVariable Long id) {
        DAOUser user = new DAOUser();

        DAOUser updateUser = userRepository.findById(id)
                .map(DAOUser -> {

                    String currentPassword = DAOUser.getPassword();
                    String newPassword = newUser.getPassword();

                    if(newPassword != null && bcryptEncoder.matches(newPassword,(currentPassword))){
                        DAOUser.setPassword(bcryptEncoder.encode(newUser.getPasswordNew()));
                        DAOUser.setConfirmPassword(bcryptEncoder.encode(newUser.getPasswordNew()));

                    }

                    return userRepository.save(DAOUser);

                }).orElseGet(() -> {
                    user.setId(id);
                    return userRepository.save(user);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Change password aaa"  , "")
        );
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @DeleteMapping("/view/delete/{id}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable Long id) {
        boolean exists = userRepository.existsById(id);



        if (exists   ) {
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Delete product successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find product to delete", "")
        );
    }


}
