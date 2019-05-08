

def reduce_list_to_longest_containg_elements(list_of_elements):
    list_of_elements.sort()
    new_list = []
    for x in list_of_elements:
        was_x_in_longer_string_as_substring = False
        was_any_y_added = False
        for y in list_of_elements:
            if x != y:
                if x in y:
                    was_x_in_longer_string_as_substring = True
                    if y not in new_list:
                        new_list.append(y)
                        was_any_y_added = True
        if not was_any_y_added and not was_x_in_longer_string_as_substring:
            if x not in new_list:
                new_list.append(x)
    return new_list

print(reduce_list_to_longest_containg_elements(["AB", "CD", "ABCD"]))
# ['ABCD']

print(reduce_list_to_longest_containg_elements(["AB", "CD", "ABC"]))
# ['ABC', 'CD']


def identify_substrings_in_string(orig_string, default_val, list_of_possible_substrings, separator):
    hits = [x for x in list_of_possible_substrings if x in orig_string]
    hits = reduce_list_to_longest_containg_elements(hits)
    if len(hits) > 0:
        return separator.join(hits)
    else:
        return default_val

print(identify_substrings_in_string("VF_BLABLA_HU", '???', ["VFHU", "VF", "HU"], "." ))
# HU.VF

print(identify_substrings_in_string("VF_HU_BLABLA", '???', ["VFHU", "VF", "HU"], "." ))
# HU.VF

print(identify_substrings_in_string("HU_VF_BLABLA", '???', ["VFHU", "VF", "HU"], "." ))
# HU.VF

print(identify_substrings_in_string("VFHU_BLABLA", '???', ["VFHU", "VF", "HU"], "." ))
# VFHU

