package com.github.Nayan_Mudewar.orgaNize.security;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class AuthUtil {
    @Value("${jwt.secretKey}")
     private String jwtSecretKey;
    public String generateToken(User user){
        return Jwts.builder()
                .setSubject(user.getName())
                .claim("userid",user.getId().toString())
                .signWith(getSecretKey())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*10))
                .compact();

    }
    public SecretKey getSecretKey(){
       return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }
}
