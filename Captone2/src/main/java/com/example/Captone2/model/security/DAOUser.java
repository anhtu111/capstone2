package com.example.Captone2.model.security;

import com.example.Captone2.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Data
@Entity
@Table(name = "user")
public class DAOUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private long id;

	@NotNull
	@Column(name = "username", length = 200, unique = true)
	private String username;
	@NotNull
	@Column(name = "password", length = 200, unique = true)
	@JsonIgnore
	private String password;
	@NotNull
	@Column(name = "email", length = 200, unique = true)
	private String email;

	@NotNull
	@Column(name = "confirmPassword", length = 200, unique = true)
	@JsonIgnore
	private String confirmPassword;

	@Column(name = "phone", length = 15)
	private String phone;

	public DAOUser(){}

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
			name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	private Set<Role> roles = new HashSet<>();

}