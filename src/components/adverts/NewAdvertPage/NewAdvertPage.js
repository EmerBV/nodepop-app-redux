import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Page from "../../layout/Page";
import InputSearch from "../../common/InputSearch";
import InputRadio from "../../common/inputRadio";
import TextArea from "../../common/MultiSelector";
import InputNumber from "../../common/InputNumber";
import InputFile from "../../common/InputFile";

import { tagsLoaded } from "../../../store/actions";
import { getTags } from "../../../store/selectors";
import { advertCreated } from "../../../store/actions";

const style = {
  createAdvertWrapper: "items-center justify-center w-full my-2",
  formWrapper: "items-center justify-center",
  formContainer: "justify-center rounded border border-[#282b2f] p-6",
  buttonContainer: "items-center justify-center text-center",
  button:
    "items-center rounded border border-[#282b2f] h-8 px-8 font-semibold mt-4",
};

const useTags = () => {
  const dispatch = useDispatch();
  const tags = useSelector(getTags);

  useEffect(() => {
    dispatch(tagsLoaded());
  }, [dispatch]);

  return tags;
};

const NewAdvertPage = () => {
  const [name, setName] = useState(null);
  const [isSale, setIsSale] = useState(null);
  const [multiSelector, setMultiselector] = useState(null);
  const [price, setPrice] = useState(null);
  const [inputFile, setInputFile] = useState(null);
  const dispatch = useDispatch();
  const tags = useTags();

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputBuySell = (e) => {
    setIsSale(e.target.value);
  };

  const saleObjet = {
    false: "buy",
    true: "sale",
  };
  const handleMultiSelector = (e) => {
    let valueMultiSelector = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setMultiselector(valueMultiSelector);
  };

  const handleInputNumber = (e) => {
    if (e.target.value > 10000) {
      e.target.value = 10000;
    }
    if (e.target.value < 0) {
      e.target.value = 0;
    }

    setPrice(e.target.value);
  };

  const handleInputfile = (e) => {
    setInputFile(e.target.files[0]);
  };

  const advertFormData = () => {
    const advertFormData = new FormData();
    advertFormData.append("name", name);
    advertFormData.append("sale", isSale);
    advertFormData.append("price", price);
    advertFormData.append("tags", multiSelector);
    if (inputFile) advertFormData.append("photo", inputFile);
    return advertFormData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(advertCreated(advertFormData()));
  };

  return (
    <Page title="Create advert">
      <div className={style.createAdvertWrapper}>
        <form className={style.formWrapper} onSubmit={handleSubmit}>
          <div className={style.formContainer}>
            <InputSearch onChange={handleInputName} label={"Name"} required />
            <InputRadio
              onChange={handleInputBuySell}
              label={"Event"}
              valueObjet={saleObjet}
              required
            />
            <TextArea
              tags={tags}
              handleMultiSelector={handleMultiSelector}
              label={"Tags"}
              required
            />
            <InputNumber
              label={"Price"}
              max={10000}
              min={0}
              onChange={handleInputNumber}
              required
            />
            <InputFile label={"Photo"} onChange={handleInputfile} />
          </div>
          <div className={style.buttonContainer}>
            <button
              type="submit"
              className={style.button}
              disabled={
                !name ||
                !price ||
                isSale === null ||
                multiSelector === null ||
                multiSelector?.length === 0
              }
            >
              Post Advert
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default NewAdvertPage;
