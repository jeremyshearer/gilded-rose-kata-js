const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  describe.each([
    ["foo", 1, 1, 0], // regular item quality decreases by 1 each day
    ["foo", 0, 0, 0], // quality is never less than 0
    ["foo", -1, 0, 0], // quality is never less than 0
    ["Aged Brie", 1, 0, 1], // Brie increases in quality
    ["Aged Brie", 1, 49, 50], // quality is never more than 50
    ["Aged Brie", 1, 50, 50], // quality is never more than 50
    ["Aged Brie", 0, 0, 2], // Brie increases in quality 2x when sell by date is past
    ["Aged Brie", 0, 48, 50], // quality is never greater than 50
    ["Aged Brie", 0, 49, 50], // quality is never greater than 50
    ["Aged Brie", 0, 50, 50], // quality is never greater than 50
    ["Backstage passes to a TAFKAL80ETC concert", 11, 0, 1],
    ["Backstage passes to a TAFKAL80ETC concert", 11, 50, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 10, 0, 2],
    ["Backstage passes to a TAFKAL80ETC concert", 6, 0, 2],
    ["Backstage passes to a TAFKAL80ETC concert", 6, 48, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 6, 49, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 6, 50, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 5, 47, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 5, 48, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 5, 49, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 5, 50, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 5, 0, 3],
    ["Backstage passes to a TAFKAL80ETC concert", 2, 0, 3],
    ["Backstage passes to a TAFKAL80ETC concert", 1, 50, 50],
    ["Backstage passes to a TAFKAL80ETC concert", 0, 50, 0],
    ["Sulfuras, Hand of Ragnaros", 0, 80, 80],
    ["Sulfuras, Hand of Ragnaros", 1, 80, 80],
    ["Sulfuras, Hand of Ragnaros", 1, 50, 50],
    ["Conjured Item", 1, 2, 0],
    ["Conjured Item", 1, 1, 0],
    ["Conjured Item", 1, 0, 0],
    ["Conjured Item", 0, 4, 0],
    ["Conjured Item", 0, 2, 0],
  ])(
    "new Item(%s, %i, %i) has quality: %i",
    (name, sellIn, initialQuality, expectedQuality) => {
      it(`updates the quality to ${expectedQuality}`, () => {
        const gildedRose = new Shop([new Item(name, sellIn, initialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(expectedQuality);
      });
    }
  );
});
