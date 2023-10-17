export function parseAndReturnLastObject(jsonString: string): any {
  // Split the string into individual JSON objects
  const jsonObjects = jsonString.trim().split('}{');

  // Ensure that each object has the correct format by adding curly braces
  const correctedJsonString = jsonObjects.map((obj, index) => {
      if (index === 0 || index === jsonObjects.length - 1) {
          return `{${obj}}`;
      } else {
          return `{${obj}}`;
      }
  });

  // Parse the JSON objects
  const parsedObjects = correctedJsonString.map((json) => {
      try {
          return JSON.parse(json);
      } catch (error) {
          return null; // Handle parsing errors as needed
      }
  });

  // Filter out any parsing errors (null values) and return the last parsed object
  const lastObject = parsedObjects.filter((obj) => obj !== null).pop();

  return lastObject;
}
