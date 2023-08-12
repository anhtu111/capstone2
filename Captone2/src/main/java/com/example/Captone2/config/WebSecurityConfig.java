package com.example.Captone2.config;

import com.example.Captone2.common.enums.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@org.springframework.beans.factory.annotation.Qualifier("authenticationManager")
@EnableWebMvc
public class WebSecurityConfig
{
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    public void authenticationManager(AuthenticationManagerBuilder auth) throws Exception {

        auth.inMemoryAuthentication().withUser("abc").password("abc123").roles("USER");
        auth.inMemoryAuthentication().withUser("tak269").password("anhkiet123").roles("ADMIN");
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // We don't need CSRF for this example
       http.cors();
        http.csrf().disable()
                // dont authenticate this particular request
                // không xác thực yêu cầu cụ thể này
                .authorizeRequests()
                .antMatchers("/authenticate","/basic/register").permitAll()
               // .antMatchers("/employee/**").hasAnyRole(String.valueOf(RoleName.ROLE_ADMIN).split("_")[1])
              //  .antMatchers("/class/**").hasAnyRole(String.valueOf(RoleName.ROLE_USER).split("_")[1])
                .antMatchers("/view/**").hasAnyRole(String.valueOf(RoleName.ROLE_ADMIN).split("_")[1])
                .antMatchers("/api").hasAnyRole(String.valueOf(RoleName.ROLE_ADMIN).split("_")[1])
                .antMatchers("/api").hasAnyRole(String.valueOf(RoleName.ROLE_USER).split("_")[1])
                .antMatchers("/api").hasAnyRole(String.valueOf(RoleName.ROLE_EMPLOYEE).split("_")[1])
                .antMatchers("/admin").hasAnyRole(String.valueOf(RoleName.ROLE_ADMIN).split("_")[1])


                // all other requests need to be authenticated
                //tất cả các yêu cầu khác cần phải được xác thực
                .anyRequest().authenticated().and().
               // .anyRequest().fullyAuthenticated().and().httpBasic();

                // make sure we use stateless session; session won't be used to
                // store user's state.
                // đảm bảo rằng chúng tôi sử dụng phiên không trạng thái; phiên sẽ không được sử dụng để
                // lưu trữ trạng thái của người dùng.
                        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //http.authenticationProvider(authenticationProvider());
//        http.authorizeRequests().antMatchers("/locations/**").hasAnyRole("ADMIN")
//                .anyRequest().fullyAuthenticated().and().httpBasic();


        // Add a filter to validate the tokens with every request
        //Thêm bộ lọc để xác thực mã thông báo với mọi yêu cầu
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.headers().defaultsDisabled().contentTypeOptions();
        http.headers().defaultsDisabled().xssProtection();
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        //config.setAllowCredentials(true);

        List<String> allowedOrigin = new ArrayList<String>();
        //allowedOrigin.add("http://localhost:5173");
        allowedOrigin.add("*");
        config.setAllowedOrigins(allowedOrigin);
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowedMethods(Arrays.stream(HttpMethod.values()).map(HttpMethod::name).collect(Collectors.toList()));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


}
