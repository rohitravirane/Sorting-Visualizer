import { uid } from "react-uid";
import $ from "jquery";

const initialColors = [
  "#FF008C",
  "#D309E1",
  "#9C1AFF",
  "#7700FF",
  "#eb4559",
  "#f78259",
  "#aeefec",
  "#f2ed6f",
  "#f3c623",
  "#10375c",
  "#116979",
];

// Generate a list (length provided as arg) of unique random numbers between 0 and 99
export function generateRandomArray(length) {
  let randomItems = [];
  while (length-- > 0) {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomItems.indexOf(randomNumber) === -1)
      randomItems.push({
        id: uid(Math.random()),
        itemValue: randomNumber,
        color: generateRandomColor(),
      });
  }
  return randomItems;
}

export function generateRandomColor() {
  return initialColors[Math.floor(Math.random() * initialColors.length)];
}

export function disabledAll() {
  // $("#launch").prop("disabled", true);
  $("#slideRange").css("visibility", "hidden");
  $("#ci").attr("disabled", "true");
  $("#di").attr("disabled", "true");
  $("#bubble").attr("disabled", "true");
  $("#insertion").attr("disabled", "true");
  $("#selection").attr("disabled", "true");
  $("#merge").attr("disabled", "true");
  $("#quick").attr("disabled", "true");
  $("#launch").attr("disabled", "true");
  $("#standard-number").attr("disabled", "true");
  $("#toggle").attr("disabled", "true");
  $("#random").attr("disabled", "true");
}

export function enableAll() {
  // $("#launch").prop("disabled", false);
  $("#slideRange").css("visibility", "");
  $("#ci").removeAttr("disabled");
  $("#di").removeAttr("disabled");
  $("#bubble").removeAttr("disabled");
  $("#insertion").removeAttr("disabled");
  $("#selection").removeAttr("disabled");
  $("#merge").removeAttr("disabled");
  $("#quick").removeAttr("disabled");
  $("#launch").removeAttr("disabled");
  $("#standard-number").removeAttr("disabled");
  $("#toggle").removeAttr("disabled");
  $("#random").removeAttr("disabled");
}

export const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};
