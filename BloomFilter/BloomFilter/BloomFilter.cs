using System;
using System.Collections;
using System.Runtime.InteropServices;
using System.Runtime.Remoting.Messaging;
using System.Linq;

namespace BloomFilterNamespace
{
    public class BloomFilter
    {
        private string[] _wordList;
        private const int BITMAP_SIZE = 100;
        private const int NUM_HASH_FUNCTIONS = 5;

        private BitArray bitmap = new BitArray(BITMAP_SIZE);

        public void AddWords(string[] wordList)
        {
            foreach (var word in wordList)
            {
                AddWord(word);
            }
        }

        private void AddWord(string word)
        {
            int[] bitmapIndex = GetHashIndex(word);
            foreach (int i in bitmapIndex)
            {
                bitmap[i] = true;
            }
        }

        private int[] GetHashIndex(string word)
        {
            int[] bitmapIndex = new int[NUM_HASH_FUNCTIONS];
            bitmapIndex[0] = Math.Abs(word.GetHashCode());

            for (int i = 1; i < NUM_HASH_FUNCTIONS; i++)
            {
                bitmapIndex[i] = Math.Abs(bitmapIndex[i - 1].GetHashCode());
            }

            for (int i = 0; i < NUM_HASH_FUNCTIONS; i++)
            {
                bitmapIndex[i] %= BITMAP_SIZE;
            }

            return bitmapIndex;
        }

        public bool Check(string word)
        {
            int[] index = GetHashIndex(word);
            foreach (int i in index)
            {
                if (!bitmap[i])
                    return false;
            }
            return true;
        }
    }
}