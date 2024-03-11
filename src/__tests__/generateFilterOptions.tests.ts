import { FireFeature } from "@/types/types";
import { generateFilterOptions } from "@/types/util";

describe("generateFilterOptions", () => {
  it("should generate filter options if feature data and a property are provided", () => {
    const mockFireFeatureData = [
      {
        type: "Feature",
        id: "testID1",
        geometry_name: "SHAPE",
        properties: {
          FIRE_CAUSE: "Person",
        },
      },
      {
        type: "Feature",
        id: "testID2",
        geometry_name: "SHAPE",
        properties: {
          FIRE_CAUSE: "Unknown",
        },
      },
    ];
    const testOptions = generateFilterOptions(
      mockFireFeatureData as FireFeature[],
      "FIRE_CAUSE"
    );

    expect(testOptions).toEqual([
      mockFireFeatureData[0].properties.FIRE_CAUSE,
      mockFireFeatureData[1].properties.FIRE_CAUSE,
    ]);
  });

  it("should not return duplicate properties", () => {
    const mockFireFeatureData = [
      {
        type: "Feature",
        id: "testID1",
        geometry_name: "SHAPE",
        properties: {
          FIRE_CAUSE: "Person",
        },
      },
      {
        type: "Feature",
        id: "testID2",
        geometry_name: "SHAPE",
        properties: {
          FIRE_CAUSE: "Person",
        },
      },
    ];

    const testOptions = generateFilterOptions(
      mockFireFeatureData as FireFeature[],
      "FIRE_CAUSE"
    );

    expect(testOptions).toEqual([
      mockFireFeatureData[0].properties.FIRE_CAUSE,
    ]);
  });
});