function TreeNode(left, right, value, frequency) {
  this.left = left;
  this.right = right;
  this.value = value;
  this.frequency = frequency;
}

const frequency = [
  ["m", 1 / 11],
  ["i", 4 / 11],
  ["s", 4 / 11],
  ["p", 2 / 11],
];

function HuffmanCode(frequency) {
  this.treeNodes = [];
  this.tree = null;

  for (let i = 0; i < frequency.length; i++) {
    this.treeNodes.push(
      new TreeNode(null, null, frequency[i][0], frequency[i][1])
    );
  }

  this.createHuffmanTree = () => {
    let tree = [...this.treeNodes];
    while (tree.length >= 2) {
      tree.sort((a, b) => a.frequency - b.frequency);

      const [first, second, ...rest] = tree;

      const newLetter = new TreeNode(
        second,
        first,
        null,
        first.frequency + second.frequency
      );

      tree = [newLetter, ...rest];
    }

    this.tree = tree[0];
  };

  this.printTree = () => {
    const print = (treeNode, depth) => {
      if (!treeNode) {
        return;
      }
      const str = `| ${treeNode.value}`;
      const toPrint = str.padStart(str.length + depth, " ");

      if (treeNode.value) {
        console.log(toPrint);
      }

      print(treeNode.left, depth + 2);
      print(treeNode.right, depth + 2);
    };
    console.log("TREE:");
    print(this.tree, 0);
  };

  this.encode = (word) => {
    if (!this.tree) {
      console.error("Build tree first");
      return;
    }

    const getCode = (treeNode, letter, code) => {
      if (!treeNode) {
        return null;
      }
      if (treeNode.value === letter) {
        return code;
      }

      const left = getCode(treeNode.left, letter, "0");
      const right = getCode(treeNode.right, letter, "1");

      if (!left && !right) {
        return null;
      }

      return code + "" + (left || "") + (right || "");
    };

    const encoded = [];

    for (let i = 0; i < word.length; i++) {
      encoded.push(getCode(this.tree, word[i], ""));
    }

    console.log(
      word + " = " + encoded.join(" "),
      "Length: " + encoded.join("").length
    );
  };
}

const huffmanCode = new HuffmanCode(frequency);
huffmanCode.createHuffmanTree();

huffmanCode.printTree();

huffmanCode.encode("mississippi");
