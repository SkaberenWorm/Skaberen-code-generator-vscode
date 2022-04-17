export function getCustomAuthenticationFilter(packageFile: string): string {

    let template = `package ${packageFile};

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

/**
 * Dependency necesary:
 * https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple
 * https://mvnrepository.com/artifact/com.auth0/java-jwt
 */
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private String secretJwt;

    private AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, String secretJwt) {
        this.authenticationManager = authenticationManager;
        this.secretJwt = secretJwt;
    }

    private String getUserName(HttpServletRequest request) {
        boolean isRefreshtoken = "refresh_token".equals(request.getParameter("grant_type"));
        if (isRefreshtoken) {
            String refreshToken = request.getParameter("refresh_token");
            return this.userNameFromResfreshToken(refreshToken);
        } else {
            return request.getParameter("username");
        }
    }

    /**
     * Procesa el envío de un formulario de autenticación.
     * Los formularios de inicio de sesión deben presentar dos parámetros para este
     * filtro: un nombre de usuario y una contraseña
     * 
     * @See https://docs.spring.io/spring-security/site/docs/4.0.x/apidocs/org/springframework/security/web/authentication/UsernamePasswordAuthenticationFilter.html
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = this.getUserName(request);
        String password = request.getParameter("refresh_token") != null ? "" : request.getParameter("password");

        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

    /**
     * Estrategia utilizada para manejar una autenticación de usuario exitosa.<br>
     * Si la autenticación fué exitosa, generamos el token JWT
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {

        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(secretJwt.getBytes());
        String accessToken = JWT.create().withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 3600 * 4))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles",
                        user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refreshToken = JWT.create().withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 3600 * 6))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles",
                        user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        // response.setHeader("access_token", accessToken);
        // response.setHeader("refresh_token", refreshToken);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    /**
     * Estrategia utilizada para manejar un intento fallido de autenticación.
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

        // super.unsuccessfulAuthentication(request, response, failed);
        Map<String, String> error = new HashMap<>();
        error.put("error", "unauthorized");
        error.put("error_description", failed.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    /**
     * Obtiene el username desde el refresh_token
     * 
     * @param refreshToken
     * @return
     */
    private String userNameFromResfreshToken(String refreshToken) {
        if (refreshToken != null && !refreshToken.isEmpty()) {
            try {
                String token = refreshToken.replace(".", "-");
                byte[] decoded = Base64.getDecoder().decode(token.split("-")[1]);
                String decodedToken = new String(decoded);
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(decodedToken);
                return jsonObject.get("sub").toString();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
        return null;
    }

}
`;

    return template;
}
