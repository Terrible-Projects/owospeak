mod utils;

use wasm_bindgen::prelude::*;
use regex::Regex;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub fn convert(input: &str) -> String {
    utils::set_panic_hook();

    let url_regex = Regex::new(r"https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&//=]*)").unwrap();

    let input_array = input.split_whitespace();
    let input_array_url_removed = input_array.clone().filter(|x| !url_regex.is_match(x));
    
    if !Regex::new(r"[a-zA-Z]").unwrap().is_match(&input_array_url_removed.clone().collect::<Vec<&str>>().join(" ")) {
        return input.to_string();
    }

    let mut input_no_url = input_array_url_removed.clone().collect::<Vec<&str>>().join(" ");

    // input_no_url = input_array_url_removed.clone().map(|x| "test").collect::<Vec<&str>>().join(" ");
    
    let edited;
    if input_array.clone().collect::<String>().len() != input_array_url_removed.collect::<String>().len() {
        let mut edited_array = input_no_url.split_whitespace();
        let mut current_index = 0;
        edited = input_array.map(|x| {
            let mut current_word = x.to_string();
            if !url_regex.is_match(x) {
                current_word = edited_array.nth(current_index).unwrap().to_string();
                current_index += 1;
            }
            current_word
        }).collect::<Vec<String>>().join(" ");
    } else {
        edited = input_no_url
    }
    
    return edited;
}
