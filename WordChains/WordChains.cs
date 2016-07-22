using System;
using System.Collections.Generic;
using System.Linq;
using NetSpell.SpellChecker.Dictionary;
using NetSpell.SpellChecker;

public class TestRunner
{
    public static void Main()
    {
        var cTests = new WordChainsTests();

        var failedTests = new List<string>();

        // using reflection, run every test method and record the names of those methods that fail
        foreach (var m in typeof(WordChainsTests).GetMethods()
                                                  .Where(m => m.DeclaringType != typeof(object)))
        {
            if (Convert.ToBoolean(m.Invoke(cTests, null)) != true)
                failedTests.Add(m.Name);
        }

        // display all the failed tests, or a message that everything passed
        if (failedTests.Any())
            Console.WriteLine("Failed Tests: \r\n\r\n{0}", string.Join("\r\n", failedTests));
        else
            Console.WriteLine("All tests passed!");

        Console.ReadLine();
    }
}
					
public class WordChains
{
	private readonly Spelling englishWordSpelling;
	
	public WordChains() {
		var englishDictionary = new WordDictionary(); 
		englishDictionary.DictionaryFile = "en-US.dic"; 
		englishDictionary.Initialize();
		
		this.englishWordSpelling = new Spelling(); 
		this.englishWordSpelling.Dictionary = englishDictionary; 
	}
	
	public List<string> GeneratePath(string start, string end) {
		var pathList = new List<string>();
		var visitedWords = new Dictionary<string, string>();
		
		var wordQueue = new Queue<string>();
		wordQueue.Enqueue(start);
		while (visitedWords.ContainsKey(end) || visitedWords.Count == 0) {
			var word = wordQueue.First();
			var successors = this.GetValidSuccessors(word, start, visitedWords);
			foreach (var successor in successors) { 
				visitedWords.Add(successor, word); 
			}
			
		}
		if (!visitedWords.ContainsKey(end)) {
			return pathList;	
		}
		var currentWord = end;
		while(currentWord != start) {
			pathList.Insert(0, visitedWords[currentWord]);
			currentWord = visitedWords[currentWord];
		}
		
		return pathList;
	}
	
	private List<string> GetValidSuccessors(string word, string start, Dictionary<string, string> visitedWords) {
		var validSuccessors = new List<string>();
		
		const string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		
		for (int i = 0; i < word.Length; i++) {
			foreach (var letter in letters) {
				var successorWord = 
					word.Substring(0, i) + 
					letter + 
					word.Substring(i+1, word.Length);
				if (successorWord != start && 
						!visitedWords.ContainsKey(successorWord) && 
						this.englishWordSpelling.TestWord(successorWord)) {
					validSuccessors.Add(successorWord);
				}
			}
		}
		
		return validSuccessors;
	}
}

public class WordChainsTests
{
    WordChains c = new WordChains();

    public bool IF_startwordEqualsEndword_THEN_generatePathReturnsStartWord()
    {
		var startWord = "test";
		var endWord = startWord;
		var pathList = c.GeneratePath(startWord, endWord);

        if (pathList.Count == 1 && pathList.Contains(startWord))
            return true;
        else
            return false;
    }

}