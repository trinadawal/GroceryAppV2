package com.accenture.web;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.accenture.web.entities.Authority;
import com.accenture.web.entities.User;
import com.accenture.web.repository.UserDetailsRepository;

@SpringBootApplication
public class GrocerySecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrocerySecurityApplication.class, args);
	}
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserDetailsRepository userDetailsRepository;
	
	@PostConstruct
	protected void init() {
		List<Authority> authorityList = new ArrayList<>();
		authorityList.add(createAuthority("USER", "User role"));
		authorityList.add(createAuthority("ADMIN", "Admin role"));
		authorityList.add(createAuthority("SADMIN", "Super Admin role"));
		
		User user = new User();
		user.setUserName("Trina");
		user.setFirstName("Patrina");
		user.setLastName("Dawal");
		user.setAuthorities(authorityList);
		
		user.setPassword(passwordEncoder.encode("password"));
		user.setEnabled(true);
		
		userDetailsRepository.save(user);
		
		
	}
	
	private Authority createAuthority(String roleCode, String roleDescription) {
		Authority authority = new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}
}
