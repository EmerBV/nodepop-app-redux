import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Page from "../../layout/Page";
import Advert from "../AdvertsPage/Advert";
import Confirmation from "../../common/Confirmation";

import { advertLoaded, advertDeleted } from "../../../store/actions";
import { getAdvert } from "../../../store/selectors";

const style = {
  advertDetailsWrapper: "flex-col w-full my-4",
  buttonWrapper: "flex items-center justify-center mt-4",
  deleteButton: "items-center rounded border border-[#282b2f] px-8 py-1",
};

const AdvertPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const advert = useSelector(getAdvert(id));

  useEffect(() => {
    dispatch(advertLoaded(id));
  }, [dispatch, id]);

  const handleDeleteAdvert = (e) => {
    e.preventDefault();
    setIsDelete(true);
  };

  const handleCancellationDelete = (e) => {
    e.preventDefault();
    setIsDelete(false);
  };

  const handleConfirmationDelete = (e) => {
    e.preventDefault();
    dispatch(advertDeleted(id));
  };
  return (
    <Page title="Article details">
      <div className={style.advertDetailsWrapper}>
        <Advert {...advert} isPhoto={true} />
        <div className={style.buttonWrapper}>
          {!isDelete && (
            <button
              className={style.deleteButton}
              variant="delete"
              onClick={handleDeleteAdvert}
            >
              Delete
            </button>
          )}
          {isDelete && (
            <Confirmation
              label={"Are you sure?"}
              handleConfirmation={handleConfirmationDelete}
              handleCancellation={handleCancellationDelete}
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default AdvertPage;
