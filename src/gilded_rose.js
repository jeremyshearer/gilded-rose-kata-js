class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const updater = this.buildQualityUpdater(item);
      updater.updateQuality();
    });

    return this.items;
  }

  buildQualityUpdater(item) {
    const updaterMap = {
      "Aged Brie": AgedBrieQualityUpdater,
      "Backstage passes to a TAFKAL80ETC concert": BackstagePassQualityUpdater,
      "Sulfuras, Hand of Ragnaros": LegendaryUpdater,
      "Conjured Item": ConjuredQualityUpdater,
    };
    const UpdaterClass = updaterMap[item.name] || QualityUpdater;
    return new UpdaterClass(item);
  }
}

class QualityUpdater {
  constructor(item) {
    this.item = item;
  }

  updateQuality() {
    this.decreaseQuality();
    this.item.sellIn -= 1;
    if (this.item.sellIn < 0) {
      this.decreaseQuality();
    }
  }

  increaseQuality() {
    if (this.item.quality < 50) {
      this.item.quality += 1;
    }
  }

  decreaseQuality() {
    if (this.item.quality > 0) {
      this.item.quality = this.item.quality - 1;
    }
  }
}

class LegendaryUpdater extends QualityUpdater {
  updateQuality() {
    return;
  }
}

class AgedBrieQualityUpdater extends QualityUpdater {
  updateQuality() {
    this.increaseQuality();
    this.item.sellIn -= 1;
    if (this.item.sellIn < 0) {
      this.increaseQuality();
    }
  }
}

class BackstagePassQualityUpdater extends QualityUpdater {
  updateQuality() {
    this.increaseQuality();
    if (this.item.sellIn < 11) {
      this.increaseQuality();
    }
    if (this.item.sellIn < 6) {
      this.increaseQuality();
    }
    this.item.sellIn -= 1;
    if (this.item.sellIn < 0) {
      this.item.quality = 0;
    }
  }
}

class ConjuredQualityUpdater extends QualityUpdater {
  updateQuality() {
    this.decreaseQuality();
    this.decreaseQuality();
    this.item.sellIn -= 1;
    if (this.item.sellIn < 0) {
      this.decreaseQuality();
      this.decreaseQuality();
    }
  }
}

module.exports = {
  Item,
  Shop,
};
