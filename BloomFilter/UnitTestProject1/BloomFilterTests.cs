using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloomFilter = BloomFilterNamespace.BloomFilter;

namespace UnitTestProject1
{
    [TestClass]
    public class BloomFilterTests
    {
        [TestMethod]
        public void GIVEN_BitmapClear_WHEN_WordAdded_THEN_CheckSucceeds()
        {
            var bloomFilter = new BloomFilter();
            var testWord = (new Random()).Next().ToString();
            string[] wordList = new[] {testWord};
            bloomFilter.AddWords(wordList);
            Assert.IsTrue(bloomFilter.Check(wordList[0]));
        }

        [TestMethod]
        public void GIVEN_BitmapClear_WHEN_WordMissing_THEN_CheckFails()
        {
            var bloomFilter = new BloomFilter();
            string[] wordList = new[] { "second" };
            Assert.IsFalse(bloomFilter.Check(wordList[0]));
        }
    }
}
