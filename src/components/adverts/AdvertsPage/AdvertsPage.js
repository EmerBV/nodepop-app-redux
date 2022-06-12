import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Advert from "./Advert";
import AdvertsFilter from "./AdvertsFilter";
import Page from "../../layout/Page";

import { advertsLoaded } from "../../../store/actions";
import { getAdverts, getAdvertsFilter } from "../../../store/selectors";

const style = {
  advertsWrapper:
    "grid 2xl:grid-cols-9 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mx-0 justify-center py-12",
  advertButton: "items-center rounded border border-[#282b2f] px-8 py-1",
};

const transformRange = (range) => {
  let rangeMin, rangeMax;
  if (range) {
    if (range[0] > range[1]) {
      rangeMax = range[0];
      rangeMin = range[1];
    } else if (range[1] > range[0]) {
      rangeMax = range[1];
      rangeMin = range[0];
    } else {
      rangeMax = range[1];
      rangeMin = range[0];
    }
  } else {
    rangeMax = 10000;
    rangeMin = 0;
  }

  return {
    rangeMax,
    rangeMin,
  };
};

const EmptyList = () => (
  <div className="items-center text-center justify-center">
    <p className="font-bold">Post your first Ad!</p>
    <button className={style.advertButton}>
      <Link to="/adverts/new">Post Ad</Link>
    </button>
  </div>
);

const AdvertsPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [isSaleFilter, setIsSaleFilter] = useState("");
  const [rangeFilter, setRangeFilter] = useState("");
  const [isFilter, setIsFilter] = useState(true);
  const [multiSelectorFilter, setMultiSelectorFilter] = useState([]);
  const dispatch = useDispatch();
  const [adverts, setAdverts] = useState([]);
  const advertsFilter = useSelector(
    getAdvertsFilter(
      nameFilter,
      isSaleFilter,
      transformRange(rangeFilter),
      multiSelectorFilter
    )
  );
  const AdvertsSelector = useSelector(getAdverts);

  useEffect(() => {
    const advertSelectorAux = AdvertsSelector;
    setAdverts(advertSelectorAux);
    dispatch(advertsLoaded());
    if (advertSelectorAux.length === 0) setIsFilter(false);
  }, [dispatch, AdvertsSelector]);

  const changeNameFilter = (name) => {
    setNameFilter(name);
  };
  const changeIsSaleFilter = (isSale) => {
    setIsSaleFilter(isSale);
  };
  const changeRangeFilter = (range) => {
    setRangeFilter(range);
  };
  const changeMultiSelector = (multiSelector) => {
    setMultiSelectorFilter(multiSelector);
  };
  const sendAllFilters = () => {
    setAdverts(advertsFilter);
    setIsFilter(true);
  };

  return (
    <Page title="Articles">
      <div>
        {adverts.length || isFilter ? (
          <Fragment>
            <AdvertsFilter
              changeNameFilter={changeNameFilter}
              sendAllFilters={sendAllFilters}
              changeIsSaleFilter={changeIsSaleFilter}
              changeRangeFilter={changeRangeFilter}
              changeMultiSelector={changeMultiSelector}
            />
            <div className={style.advertsWrapper}>
              {adverts.map((advert) => (
                <Link to={`/adverts/${advert.id}`}>
                  <Advert key={advert.id} {...advert} />
                </Link>
              ))}
            </div>
          </Fragment>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;
