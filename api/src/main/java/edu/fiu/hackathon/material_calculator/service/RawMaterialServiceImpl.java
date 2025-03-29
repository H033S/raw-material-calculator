package edu.fiu.hackathon.material_calculator.service;

import java.util.List;
import java.util.Optional;

import edu.fiu.hackathon.material_calculator.exception.RawMaterialNotFoundException;
import org.springframework.stereotype.Service;

import edu.fiu.hackathon.material_calculator.model.RawMaterial;
import edu.fiu.hackathon.material_calculator.repository.RawMaterialRepository;

/**
 * RawMaterialServiceImpl
 */
@Service
public class RawMaterialServiceImpl implements RawMaterialService {

    private RawMaterialRepository rawMaterialRepository;

    public RawMaterialServiceImpl(RawMaterialRepository rawMaterialRepository) {
        this.rawMaterialRepository = rawMaterialRepository;
    }

    @Override
    public List<RawMaterial> getAllRawMaterials() {
        return rawMaterialRepository.findAll();
    }

    @Override
    public RawMaterial getRawMaterialById(Long id) {

        return rawMaterialRepository
                .findById(id)
                .orElseThrow(
                        () -> new RawMaterialNotFoundException(
                                "Raw material with id " + id + " was not found")
                );
    }

    @Override
    public RawMaterial saveRawMaterial(RawMaterial rawMaterial) {
        return rawMaterialRepository.save(rawMaterial);
    }

    @Override
    public void deleteRawMaterial(Long id) {

        RawMaterial materialToDelete = getRawMaterialById(id);
        rawMaterialRepository.delete(materialToDelete);
    }

    @Override
    public void updateRawMaterial(Long id, RawMaterial toUpdate) {

        RawMaterial materialToUpdate = getRawMaterialById(id);
        materialToUpdate.setName(toUpdate.getName());
        rawMaterialRepository.save(materialToUpdate);
    }

}
