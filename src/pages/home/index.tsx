import { irunaWorldAreas } from "@/data/areas";
import { Input, Select } from "antd"
import { useState } from "react";
import Card from "./Card";

const index = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [startLocation, setStartLocation] = useState(0);
  const handleChangeStartLocation = (value: number) => {
    setStartLocation(value);
  };
  const selectOptions = irunaWorldAreas.map(area => { return { value: area.id, label: area.name } });
  selectOptions.unshift({ value: 0, label: "<<Any free-teleport area>>" });
  const handleSearchChange = (e: any) => {
    const searchValue = e.target.value;
    if (isNullOrEmpty(searchValue)) {
      setSearchResult([]);
      return;
    }
    const result: any = searchAreasByString(searchValue);
    setSearchResult(result);
  }
  function searchAreasByString(input: string) {
    const searchTerm = input.toLowerCase();
    const matchingAreas = [];

    for (const area of irunaWorldAreas) {
      const areaName = area.name.toLowerCase();

      if (areaName.includes(searchTerm)) {
        matchingAreas.push(area);
      }
    }

    return matchingAreas;
  }
  function isNullOrEmpty(str: string) {
    return str === null || str.trim() === '';
  }
  return (
    <div className="p-5 bg-blue-950 min-h-screen text-white">
      <h1 className="mb-3 font-bold text-2xl text-center">
        Toram Path Finder
      </h1>
      <hr className="my-5" />
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 md:col-span-1">
          <p className="mb-2">From</p>
          <Select
            showSearch
            onChange={handleChangeStartLocation}
            style={{ width: "100%" }}
            placeholder="Choose your start location"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={selectOptions}
            className="mb-3"
            defaultValue={0}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="mb-2">To</p>
          <Input placeholder="Enter name of the place" onChange={handleSearchChange} />
        </div>
      </div>


      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        {
          searchResult.map((result: any) => {
            return (
              <div key={result.id}>
                <Card data={result} startLocation={startLocation} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default index