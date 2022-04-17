export function getSecurityConfig(packageFile: string): string {

    let template = `package ${packageFile};

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Clase de configuración para manejar la forma en que el usuario se autenticará
 * con nuestro sistema.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("\${production}")
    private boolean production;

    // Llave secreta con la que se firmará el token JWT
    @Value("\${jwt.secret}")
    private String secretJwt;

    /**
     * La interfaz UserDetailsService se utiliza para recuperar datos relacionados
     * con el usuario. Tiene un método llamado loadUserByUsername() que se puede
     * sobreescribir para personalizar el proceso de búsqueda del usuario.
     * 
     * @see cl.uft.app_terrae.services.impl#loadUserByUsername(String username)
     */
    @Autowired
    UserDetailsService userDetailsService;

    /**
     * <p>
     * Para securizar los datos de los usuarios, vamos a encriptar la password
     * utilizando el objeto que nos provee Spring Security llamado
     * BcryptPasswordEncoder en la clase SecurityConfig.
     * </p>
     * <p>
     * Con &#64;Bean vamos a crear el factory method para poder instanciar el
     * encoder. Y
     * para poder utilizarlo, se lo setearemos con el metodo passwordEncoder al
     * userDetailService.
     * </p>
     * 
     * @return {@link BCryptPasswordEncoder}
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Sobreescribimos el método configure para poder configurar
     * nosotros el AuthenticationManagerBuilder que es el objeto que se encargará de
     * realizar el manejo de la autenticación de usuarios.
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(this.passwordEncoder());
    }

    /**
     * Sobreescribimos este método para cambiar las politicas de seguridad que
     * vienen por defecto en Spring Security.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(
                this.authenticationManager(), this.secretJwt);
        customAuthenticationFilter.setFilterProcessesUrl("/oauth/token");
        // Deshabilitamos la protección CSRF (Cross-site request forgery) ya que
        // usaremos un token JWT como mecanismo de seguridad.
        http.csrf().disable();
        // Indicamos que no deseamos crear sesiones
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Indicamos que nos permita consultar estas rutas sin autenticación
        http.authorizeRequests().antMatchers(this.matchersList()).permitAll();
        // Indicamos que por defecto ante cualquier requerimineto por el usuario, este
        // debe estar autenticado
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(secretJwt), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * Obtiene las URL o endpoint que no necesitan autenticación previa
     * 
     * @return List of {@link String} matchersList()
     */
    private String[] matchersList() {
        String[] matchers;
        if (production) {
            matchers = new String[] { "/oauth/token", "/favicon.ico", "/app/**" };
        } else {
            matchers = new String[] {
                    "/oauth/token",
                    "/test",
                    "/favicon.ico",
                    "/app/**",
                    "/swagger-ui.html", "/webjars/**", "/v2/api-docs", "/swagger-resources/configuration/ui",
                    "/swagger-resources", "/swagger-resources/configuration/security"
            };
        }
        return matchers;
    }

}
`;

    return template;
}
