export function getEntityNotFoundExceptionTemplate(
    packageException: string,
): string {

    let template = `package ${packageException};

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException() {
        super("El registro solicitado no existe");
    }

    public EntityNotFoundException(String mensaje) {
        super(mensaje);
    }

}`;

    return template;
}

export function getErrorProcessingExceptionTemplate(
    packageException: string,
): string {

    let template = `package ${packageException};

public class ErrorProcessingException extends RuntimeException {

    public ErrorProcessingException() {
        super("Se produjo un error inesperado al intentar procesar su solicitud");
    }

    public ErrorProcessingException(String mensaje) {
        super(mensaje);
    }

    public ErrorProcessingException(String mensaje, Throwable root) {
        super(mensaje, root);
    }
}`;

    return template;
}

export function getUnsavedEntityExceptionTemplate(
    packageException: string,
): string {

    let template = `package ${packageException};

public class UnsavedEntityException extends RuntimeException {

    public UnsavedEntityException() {
        super("Se produjo un error inesperado al intentar guardar el registro");
    }

    public UnsavedEntityException(String mensaje) {
        super(mensaje);
    }

}`;

    return template;
}
