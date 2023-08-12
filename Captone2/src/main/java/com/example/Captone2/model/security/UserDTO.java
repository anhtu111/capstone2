package com.example.Captone2.model.security;

import com.example.Captone2.entity.Role;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
public class UserDTO {

	private String username;


	private String password;

	private String email;

	private String confirmPassword;

	private String phone;

	private String roleName;

	private String passwordNew;



}