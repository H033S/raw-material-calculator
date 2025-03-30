package edu.fiu.hackathon.material_calculator.controller;

import edu.fiu.hackathon.material_calculator.exception.ProductNotFoundException;
import edu.fiu.hackathon.material_calculator.exception.RawMaterialNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalAdviceController {

    @ExceptionHandler(
            {
                    RawMaterialNotFoundException.class,
                    ProductNotFoundException.class
            }
    )
    ResponseEntity<?> catchingRawMaterialNotFoundException(Exception ex) {

        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
