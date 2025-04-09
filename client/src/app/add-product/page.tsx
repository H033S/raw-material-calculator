"use client";

import DropDownComponent from "../components/DropDownComponent";
import ProductListComponent from "../components/ProductListComponent";


export default function AddProductComponent() {

    function addProduct(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <h2 className="mb-4">Add Products</h2>

                    <div className="row mb-3">
                        <div className="col">
                            <DropDownComponent />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <button
                                className="btn btn-primary w-100"

                                onClick={() => addProduct()}
                            >Add</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-secondary w-100">Create new Product</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <ProductListComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
