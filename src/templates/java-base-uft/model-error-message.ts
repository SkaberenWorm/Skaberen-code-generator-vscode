export function getModelErrorMessageTemplate(
    packageModel: string,
): string {

    let template = `package ${packageModel};

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorMessage {

    private int status;
    private Date timestamp;
    private String error;
    private String message;
    private String path;

}`;

    return template;
}
