package be.xaviermassart.socialnetwork.exeception;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ErrorResponse {
    private int status;
    private String path;
    private String error;
    private long timestamp;
}
