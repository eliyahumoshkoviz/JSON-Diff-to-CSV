import * as fs from 'fs';

export function createCSV(filePath1, filePath2) {
    const obj1 = JSON.parse(fs.readFileSync(filePath1, "utf8"));
    const obj2 = JSON.parse(fs.readFileSync(filePath2, "utf8"));
    const csvHeader = "Original,Updated\n";
    const uniqueKeys = getUniqueKeysFromObjects(obj1, obj2);  
    const maxLength = Math.max(uniqueKeys[0].length, uniqueKeys[1].length);
    const csvRows = [];
    for (let i = 0; i < maxLength; i++) {
      const key1 = uniqueKeys[0][i] || "";
      const key2 = uniqueKeys[1][i] || "";
      csvRows.push(`${key1},${key2}`);
    }
    return csvHeader + csvRows.join("\n") + "\n";
  }

function getUniqueKeysFromObjects(obj1, obj2) {
  const keysObj1 = getKeysFromObject(obj1);
  const keysObj2 = getKeysFromObject(obj2);
  const uniqueKeysObj1 = keysObj1.filter((k) => !keysObj2.includes(k));
  const uniqueKeysObj2 = keysObj2.filter((k) => !keysObj1.includes(k));
  return [uniqueKeysObj1, uniqueKeysObj2];
}

function getKeysFromObject(obj, prefix = "") {
  let keys = [];
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const prefixedKey = prefix ? `${prefix}.${k}` : k;
      if (Array.isArray(obj[k])) {
        if (obj[k].length > 0 && typeof obj[k][0] === "object") {
          obj[k].forEach((item, index) => {
            const nestedKeys = getKeysFromObject(item, `${prefixedKey}.${index}`);
            keys = keys.concat(nestedKeys);
          });
        } else {
          keys.push(prefixedKey);
        }
      } else if (typeof obj[k] === "object" && obj[k] !== null) {
        const nestedKeys = getKeysFromObject(obj[k], prefixedKey);
        keys = keys.concat(nestedKeys);
      } else {
        keys.push(prefixedKey);
      }
    }
  }
  return keys;
}