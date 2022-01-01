use regex::Regex;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub fn replace_regex(regex: &str, input: &str, replacement: &str) -> String {
    Regex::new(regex).unwrap().replace_all(input, replacement).to_string()
}

pub fn match_case(original: &str, edited: &str) -> String {
    let mut original = original.to_string(); 
    while original.len() < edited.len() {
        original = original.chars().nth(0).unwrap().to_string() + &original;
    }
    while original.len() > edited.len() {
        original.remove(1);
    }

    let mut output = String::new();
    let mut i = 0;
    for c in original.chars() {
        if c.is_uppercase() {
            output.push(edited.chars().nth(i).unwrap().to_uppercase().next().unwrap());
        } else {
            output.push(edited.chars().nth(i).unwrap().to_lowercase().next().unwrap());
        }
        i += 1;
    }
    output
}

pub fn replace_regex_match_case(regex: &str, input: &str, replacement: &str) -> String {
    let mut edited = input.to_string();
    let edited_strings = vec![];
    for x in Regex::new(regex).unwrap().find_iter(input) {
        if !edited_strings.contains(&x.as_str()) {
            edited = edited.replace(&x.as_str(), &match_case(&x.as_str(), replacement));
        }
    }
    edited
}