package com.example.Captone2.service;

import com.example.Captone2.common.enums.RoleName;
import com.example.Captone2.dao.UserDao;

import com.example.Captone2.entity.Role;
import com.example.Captone2.model.security.DAOUser;
import com.example.Captone2.model.security.UserDTO;
import com.example.Captone2.respositories.RoleRepository;
import com.example.Captone2.respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;


	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		DAOUser user = userDao.findByUsername(username);
		if (user != null) {
			//System.out.println("O day khong the Null");

			//set them role
			List<GrantedAuthority> authorities = user.getRoles().stream()
					.map(role -> new SimpleGrantedAuthority(role.getName().name()))
					.collect(Collectors.toList());
			return new User(user.getUsername(), user.getPassword(), authorities);
		}
		throw new UsernameNotFoundException("User not found with username: " + username);
	}

	public DAOUser save(UserDTO user) {


		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		newUser.setConfirmPassword(bcryptEncoder.encode(user.getConfirmPassword()));
		newUser.setPhone(user.getPhone());


		Set<Role> roles = new HashSet<>();

		List<Role> rl = roleRepository.findAll();

		String roleName = user.getRoleName();
		if (roleName != null && roleName.equals("ROLE_EMPLOYEE")) {
			Role userRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE);
			roles.add(userRole);
			newUser.setRoles(roles);
		}
		if (roleName != null && roleName.equals("ROLE_USER")) {
			Role userRole = roleRepository.findByName(RoleName.ROLE_USER);
			roles.add(userRole);
			newUser.setRoles(roles);
		}



		return userDao.save(newUser);


	}

	public DAOUser save_basic(UserDTO user) {


		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		newUser.setConfirmPassword(bcryptEncoder.encode(user.getConfirmPassword()));
		newUser.setPhone(user.getPhone());


		Set<Role> roles = new HashSet<>();

		Role userRole = roleRepository.findByName(RoleName.ROLE_USER);
		roles.add(userRole);
		newUser.setRoles(roles);

		return userDao.save(newUser);


	}
}