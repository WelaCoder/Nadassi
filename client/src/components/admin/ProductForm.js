import React, { useCallback, useState } from "react";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Toggle from "react-toggle";
import axios from "axios";
import { OPTIONS } from "../../config/selectConfig";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { addProduct } from "../../actions/appActions";
const ProductForm = ({ addProduct }) => {
  const [images, setImages] = useState([]);
  const [dressType, setDressType] = useState();
  const [dressSize, setDressSize] = useState([]);
  const [dressColor, setDressColor] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setdata] = useState({
    images: [],
    name: "",
    price: 0,
    dressType: "",
    dressSize: "",
    dressColor: "",
    fabric: "",
    closure: "",
    length: 0,
    neckline: 0,
    waistline: 0,
    details: "",
    modelHeightSize: 0,
  });

  const [placeholder, setPlaceHolder] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const placeholderArray = [];
    setImages(acceptedFiles);
    setdata({
      ...data,
      images: acceptedFiles,
    });
    acceptedFiles.map((file) =>
      placeholderArray.push(URL.createObjectURL(file))
    );

    setPlaceHolder(placeholderArray);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // const {
    //   price,
    //   name,
    //   closure,
    //   details,
    //   fabric,
    //   length,
    //   neckLine,
    //   waistLine,
    //   modelHAndS,
    // } = data;

    // const productDetails = {
    //   closure,
    //   details,
    //   fabric,
    //   length,
    //   neckLine,
    //   waistLine,
    //   modelHAndS,
    // };
    // images.map((file) => data.append("images", file));
    // data.append("price", price);
    // data.append("name", name);
    // data.append("rating", "5");
    // data.append("size", dressSize);
    // data.append("color", dressColor);
    // data.append("dressType", dressType);
    // data.append("inStock", inStock);
    // data.append("details", JSON.stringify(productDetails));

    // axios
    //   .post("/product", data)
    //   .then((res) => {
    //     setIsLoading(false);
    //     toast.success("Product Added Successfully", {
    //       autoClose: "1500",
    //     });
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     toast.error("Unable To Add Product", {
    //       autoClose: "1500",
    //     });
    //   });
    const product = new FormData();
    images.map((file) => data.append("images", file));
    product.append("price", data.price);
    product.append("name", data.name);
    product.append("rating", "5");
    product.append("size", data.dressSize);
    product.append("color", data.dressColor);
    product.append("dressType", data.dressType);
    product.append("inStock", data.inStock);
    product.append("details", data.details);
    product.append("fabric", data.fabric);
    product.append("closure", data.closure);
    product.append("length", data.length);
    product.append("neckline", data.neckline);
    product.append("waistline", data.waistline);
    product.append("modelHeightSize", data.modelHeightSize);
    console.log("submitted");
    console.log(data);
    addProduct(product);
  };
  const onChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between">
          <h3 className="mb-0 font-weight-bold text-info">Upload Product</h3>
          <div className="d-flex justify-content-end align-items-center">
            <span className="mr-2">In Stock</span>
            <Toggle
              id="123"
              defaultChecked={inStock}
              onChange={(e) => {
                setInStock(e.target.checked);
              }}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="bg-white my-3 d-flex justify-content-center border shadow-sm py-5 mb-2">
                <span className="text-info font-weight-bold">
                  Drag n Drop Image Here Or Click to Select..
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex mb-3 wrap">
            {placeholder.map((img) => (
              <img
                className="img-thumbnail h-300px mr-3 mb-2"
                src={img}
                alt={img}
              />
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChange}
              // ref={register}
              required
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="price"
              value={data.price}
              onChange={onChange}
              required
              // ref={register}
              placeholder="Price"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Select
              defaultValue={"casual"}
              placeholder="Select Dress Type.."
              name="dressType"
              onChange={(e) => {
                setdata({
                  ...data,
                  dressType: e.value.toString(),
                });

                console.log(data);
                console.log(e.value);
              }}
              options={OPTIONS.dressTypeOptions}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Select
              defaultValue={[]}
              isMulti
              placeholder="Select Dress Size.."
              name="colors"
              // innerRef={register}
              options={OPTIONS.dressSizeOptions}
              onChange={(values) => {
                values !== null &&
                  setDressSize(values.map(({ value }) => value));
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <CreatableSelect
              isMulti
              placeholder="Select Dress Color.."
              options={OPTIONS.dressColorOptions}
              onChange={(values) => {
                values !== null &&
                  setDressColor(values.map(({ value }) => value));
              }}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <h4 className="font-weight-bold text-info">Product Details</h4>
            <span className="tag ">Optional</span>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input
                  name="closure"
                  // ref={register}
                  value={data.closure}
                  onChange={onChange}
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter Closure"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  name="fabric"
                  value={data.fabric}
                  onChange={onChange}
                  required
                  // ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Enter Fabric"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <input
                  name="length"
                  value={data.length}
                  onChange={onChange}
                  required
                  // ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Enter Length"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input
                  name="neckLine"
                  value={data.neckline}
                  onChange={onChange}
                  required
                  // ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Enter Neckline"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  name="waistLine"
                  // ref={register}
                  value={data.waistline}
                  onChange={onChange}
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter Waistline"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  name="details"
                  // ref={register}
                  value={data.details}
                  onChange={onChange}
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter Details"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  name="modelHeightSize"
                  value={data.modelHeightSize}
                  onChange={onChange}
                  required
                  // ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Enter Model Height And Size"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 ">
          <button
            type="submit"
            className="btn btn-block btn-dark mb-2"
            disabled={isLoading}
          >
            <span
              className={
                isLoading ? "mr-2 spinner-border spinner-border-sm" : ""
              }
              role="status"
              aria-hidden="true"
            ></span>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { addProduct })(ProductForm);
