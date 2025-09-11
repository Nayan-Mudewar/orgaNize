package com.github.Nayan_Mudewar.orgaNize.security;

import lombok.Value;

import java.nio.charset.StandardCharsets;

public class AuthUtil {
    @Value("${jwt.secretkey}")
     private String jwtSecretKey;
    public generateToken(){

    }
    public jwtSecretKey getSecretKey(){
       Keys.hmacshakeysfor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }
}
