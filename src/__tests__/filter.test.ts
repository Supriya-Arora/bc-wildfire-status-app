import { filter } from "@/types/util";

describe("filter", () => {
  it("should add filter if only FIRE_CAUSE is provided", () => {
    const FIRE_CAUSE = "Person";
    const testFilter = filter({
      FIRE_CAUSE,
      FIRE_STATUS: "",
      GEOGRAPHIC_DESCRIPTION: "",
    });

    expect(testFilter).toEqual(`FIRE_CAUSE='${FIRE_CAUSE}'`);
  });

  it("should add filter if FIRE_STATUS is provided", () => {
    const FIRE_STATUS = "Under Control";
    const testFilter = filter({
      FIRE_STATUS,
      FIRE_CAUSE: "",
      GEOGRAPHIC_DESCRIPTION: "",
    });

    expect(testFilter).toEqual(`FIRE_STATUS='${FIRE_STATUS}'`);
  });

  it("should add filter if GEOGRAPHIC_DESCRIPTION is provided", () => {
    const GEOGRAPHIC_DESCRIPTION = "Test Area";
    const testFilter = filter({
      FIRE_STATUS: "",
      FIRE_CAUSE: "",
      GEOGRAPHIC_DESCRIPTION,
    });

    expect(testFilter).toEqual(
      `GEOGRAPHIC_DESCRIPTION='${GEOGRAPHIC_DESCRIPTION}'`
    );
  });

  it("should add filter if FIRE_STATUS and FIRE_CAUSE are provided", () => {
    const FIRE_CAUSE = "Person";
    const FIRE_STATUS = "Under Control";
    const testFilter = filter({
      FIRE_STATUS,
      FIRE_CAUSE,
      GEOGRAPHIC_DESCRIPTION: "",
    });

    expect(testFilter).toEqual(
      `FIRE_STATUS='${FIRE_STATUS}' AND FIRE_CAUSE='${FIRE_CAUSE}'`
    );
  });

  it("should add filter if FIRE_CAUSE and GEOGRAPHIC_DESCRIPTION are provided", () => {
    const FIRE_CAUSE = "Person";
    const GEOGRAPHIC_DESCRIPTION = "Test Area";
    const testFilter = filter({
      FIRE_STATUS: "",
      FIRE_CAUSE,
      GEOGRAPHIC_DESCRIPTION,
    });

    expect(testFilter).toEqual(
      `FIRE_CAUSE='${FIRE_CAUSE}' AND GEOGRAPHIC_DESCRIPTION='${GEOGRAPHIC_DESCRIPTION}'`
    );
  });

  it("should add filter if FIRE_STATUS and GEOGRAPHIC_DESCRIPTION are provided", () => {
    const FIRE_STATUS = "Under Control";
    const GEOGRAPHIC_DESCRIPTION = "Test Area";
    const testFilter = filter({
      FIRE_STATUS,
      FIRE_CAUSE: "",
      GEOGRAPHIC_DESCRIPTION,
    });

    expect(testFilter).toEqual(
      `FIRE_STATUS='${FIRE_STATUS}' AND GEOGRAPHIC_DESCRIPTION='${GEOGRAPHIC_DESCRIPTION}'`
    );
  });

  it("should not add filter if no options are provided", () => {
    const testFilter = filter({
      FIRE_STATUS: "",
      FIRE_CAUSE: "",
      GEOGRAPHIC_DESCRIPTION: "",
    });

    expect(testFilter).toEqual("");
  });
});