function merge_sort(array) {
  if (array.length === 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  return merge(merge_sort(left), merge_sort(right));
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].itemValue < right[rightIndex].itemValue) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  let result = resultArray
              .concat(left.slice(leftIndex))
              .concat(right.slice(rightIndex));
  // console.log(result);
  return result;
}